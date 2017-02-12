package it.nerdherd.betresults.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.bson.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import it.nerdherd.betresults.rest.client.DataFactoryService;
import it.nerdherd.betresults.rest.model.PartiteJson;
import it.nerdherd.betresults.rest.model.PartiteJson.Competition;
import it.nerdherd.betresults.rest.model.PartiteJson.Country;
import it.nerdherd.betresults.rest.model.PartiteJson.Matches;

public class PartiteMapper {
	private static final String DB_NAME = "betresults";
	private static final String DB_COLL_COMPETITIONS = "competitions";
	private static final String DB_COLL_MATCHES = "matches";
	private static final String DB_COLL_APP_STATS = "app_stats";

	public final static long MILLIS_PER_DAY = 24 * 60 * 60 * 1000L;
	public final static long MILLIS_PER_MONTH = 30 * MILLIS_PER_DAY;

	private static void checkForCompetitionsUpdate(FindIterable<Document> app_stats) {
		long curr_timestamp = System.currentTimeMillis();
		System.out.println("	BET RESULTS - checkForCompetitionsUpdate START...");

		BasicDBObject filter = new BasicDBObject();
		filter.put("type", DB_COLL_COMPETITIONS);
		Document competitions_app_stats = app_stats.filter(filter).first();
		if (competitions_app_stats != null) {
			if (curr_timestamp - competitions_app_stats.getLong("last_update") > MILLIS_PER_MONTH) {
				// 1 mese fa
				PartiteMapper.updateDBCompetitions();
				PartiteMapper.updateLastUpdate(DB_COLL_COMPETITIONS, curr_timestamp);
			}
		} else {
			PartiteMapper.updateDBCompetitions();
			PartiteMapper.insertLastUpdate(DB_COLL_COMPETITIONS, curr_timestamp);
		}
		System.out.println("	BET RESULTS - checkForCompetitionsUpdate FINE.");
	}

	private static void checkForMatchesUpdate(FindIterable<Document> app_stats) {
		long curr_timestamp = System.currentTimeMillis();
		System.out.println("	BET RESULTS - checkForMatchesUpdate START...");

		BasicDBObject filter = new BasicDBObject();
		filter.put("type", DB_COLL_MATCHES);
		Document matches_app_stats = app_stats.filter(filter).first();
		if (matches_app_stats != null) {
			if (curr_timestamp - matches_app_stats.getLong("last_update") > MILLIS_PER_DAY) {
				// 1 giorno fa
				PartiteMapper.updateDBMatches();
				PartiteMapper.updateLastUpdate(DB_COLL_MATCHES, curr_timestamp);
			}
		} else {
			PartiteMapper.updateDBMatches();
			PartiteMapper.insertLastUpdate(DB_COLL_MATCHES, curr_timestamp);
		}
		System.out.println("	BET RESULTS - checkForMatchesUpdate FINE.");
	}

	public static void checkForUpdate() {
		System.out.println("	BET RESULTS - checkForUpdate");
		MongoClient mongoClient = MongoDBDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);
		MongoCollection<Document> dbColl = db.getCollection(DB_COLL_APP_STATS);

		try {
			FindIterable<Document> app_stats = dbColl.find();

			PartiteMapper.checkForCompetitionsUpdate(app_stats);
			PartiteMapper.checkForMatchesUpdate(app_stats);
			System.out.println("	BET RESULTS - checkForUpdate FINE.");
		} finally {
			mongoClient.close();
		}
	}

	public static List<Competition> getDBCompetitions() {
		System.out.println("	BET RESULTS - getDBCompetitions START...");
		List<Competition> competitionsList = new ArrayList<>();
		MongoClient mongoClient = MongoDBDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);
		MongoCollection<Document> dbColl = db.getCollection(DB_COLL_COMPETITIONS);

		try {
			FindIterable<Document> competitions = dbColl.find().limit(100);
			for (Document competition : competitions) {
				DBCompetition compDB = MongoDBDao.fromDocument(DBCompetition.class, competition);
				Country c = new Country(compDB.getCountry_code(), compDB.getCountry_code());
				List<Country> cl = new ArrayList<>();
				cl.add(c);
				Competition comp = new Competition(compDB.getId(), compDB.getNome(), cl);
				competitionsList.add(comp);
			}
			System.out.println("	BET RESULTS - getDBCompetitions END.");
		} finally {
			mongoClient.close();
		}
		return competitionsList;
	}

	public static List<Matches> getDBMatches() {
		System.out.println("	BET RESULTS - getDBMatches START...");
		List<Matches> matchesList = new ArrayList<>();
		MongoClient mongoClient = MongoDBDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);
		MongoCollection<Document> dbColl = db.getCollection(DB_COLL_MATCHES);

		try {
			FindIterable<Document> matches = dbColl.find();
			for (Document matchDoc : matches) {
				DBMatch matchDB = MongoDBDao.fromDocument(DBMatch.class, matchDoc);
				Matches match = new Matches(matchDB.getCompetition_id(), matchDB.getId(), matchDB.getDate_time_utc_moment(),
						matchDB.getTeam_A_id(), matchDB.getTeam_A_title(), matchDB.getTeam_B_id(),
						matchDB.getTeam_B_title());
				matchesList.add(match);
			}
			System.out.println("	BET RESULTS - getDBMatches END.");
		} finally {
			mongoClient.close();
		}
		return matchesList;
	}

	public static void insertLastUpdate(String type, long timestamp) {
		MongoClient mongoClient = MongoDBDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);

		try {
			MongoCollection<Document> dbCollAppStats = db.getCollection(DB_COLL_APP_STATS);
			Document last_update = new Document();
			last_update.put("type", type);
			last_update.put("last_update", timestamp);
			dbCollAppStats.insertOne(last_update);

		} finally {
			mongoClient.close();
		}
	}

	public static void storeDBCompetitions(PartiteJson competitions) {
		System.out.println("	BET RESULTS - storeDBCompetitions START...");
		MongoClient mongoClient = MongoDBDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);
		MongoCollection<Document> dbCollCompetitions = db.getCollection(DB_COLL_COMPETITIONS);

		try {
			// Recreate competition collection
			dbCollCompetitions.drop();
			db.createCollection(DB_COLL_COMPETITIONS);
			dbCollCompetitions = db.getCollection(DB_COLL_COMPETITIONS);

			for (Competition competition : competitions.getCompetitions()) {
				DBCompetition comp = new DBCompetition();
				comp.setId(competition.getCompetition_id());
				comp.setNome(competition.getTitle());
				if (!competition.getCountry().isEmpty())
					comp.setCountry_code(competition.getCountry().get(0).getCountryCode());

				dbCollCompetitions.insertOne(MongoDBDao.toDocument(DBCompetition.class, comp));
			}
			System.out.println("	BET RESULTS - storeDBCompetitions END.");
		} finally {
			mongoClient.close();
		}
	}

	public static void storeDBMatches(PartiteJson matches) {
		System.out.println("	BET RESULTS - storeDBMatches START...");
		MongoClient mongoClient = MongoDBDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);
		MongoCollection<Document> dbCollMatches = db.getCollection(DB_COLL_MATCHES);
		try {
			for (Matches match : matches.getMatches()) {
				DBMatch matchDB = new DBMatch();
				matchDB.setId(match.getMatch_id());
				matchDB.setCompetition_id(match.getCompetition_id());
				matchDB.setDate_time_utc_moment(match.getDate_time_utc_moment());
				matchDB.setTeam_A_id(match.getTeam_A_id());
				matchDB.setTeam_A_title(match.getTeam_A_title());
				matchDB.setTeam_B_id(match.getTeam_B_id());
				matchDB.setTeam_B_title(match.getTeam_B_title());

				dbCollMatches.insertOne(MongoDBDao.toDocument(DBMatch.class, matchDB));
			}
			System.out.println("	BET RESULTS - storeDBMatches END.");
		} finally {
			mongoClient.close();
		}
	}

	public static void updateDBCompetitions() {
		long start_time = System.currentTimeMillis();
		System.out.println("	BET RESULTS - competitionsUpdate START.. " + new Date().toString());
		PartiteJson competitions = DataFactoryService.getInstance().getCompetitions();
		System.out.println("Stored " + competitions.getCompetitions().size() + " competitions in DB");
		PartiteMapper.storeDBCompetitions(competitions);
		System.out.println(
				"	BET RESULTS - competitionsUpdate FINISH.. in " + (System.currentTimeMillis() - start_time) + "ms");
	}

	public static void updateDBMatches() {
		long start_time = System.currentTimeMillis();
		System.out.println("	BET RESULTS - updateDBMatches START.. " + new Date().toString());
		List<Competition> competitions = PartiteMapper.getDBCompetitions();

		MongoClient mongoClient = MongoDBDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);
		MongoCollection<Document> dbCollMatches = db.getCollection(DB_COLL_MATCHES);

		try {
			dbCollMatches.drop();
			db.createCollection(DB_COLL_MATCHES);
			dbCollMatches = db.getCollection(DB_COLL_MATCHES);

			for (Competition comp : competitions) {
				PartiteJson matchesList = DataFactoryService.getInstance().getMatches(comp.getCompetition_id());
				System.out.println("Stored " + matchesList.getMatches().size() + " matches in DB for competition "
						+ comp.getCompetition_id());
				PartiteMapper.storeDBMatches(matchesList);
			}
			System.out.println(
					"	BET RESULTS - updateDBMatches FINISH.. in " + (System.currentTimeMillis() - start_time) + "ms");
		} finally {
			mongoClient.close();
		}

	}

	public static void updateLastUpdate(String type, long timestamp) {
		MongoClient mongoClient = MongoDBDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);

		try {
			MongoCollection<Document> dbCollAppStats = db.getCollection(DB_COLL_APP_STATS);
			BasicDBObject filter = new BasicDBObject().append("type", type);
			dbCollAppStats.updateOne(filter, new Document("$set", new Document("last_update", timestamp)));
		} finally {
			mongoClient.close();
		}
	}
}
