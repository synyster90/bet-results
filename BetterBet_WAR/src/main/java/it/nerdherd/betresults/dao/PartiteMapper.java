package it.nerdherd.betresults.dao;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import it.nerdherd.betresults.rest.model.CompetitionList;
import it.nerdherd.betresults.rest.model.CompetitionList.Competition;

public class PartiteMapper {
	private static final Logger log = LoggerFactory.getLogger(PartiteMapper.class);

	private static final String DB_NAME = "betresults";
	private static final String DB_COLL_COMPETITIONS = "competitions";

	public static void getDBCompetitions() {
	}

	public static void storeDBCompetitions(CompetitionList competitions) {
		MongoClient mongoClient = MongoJackDao.getDBClient();
		MongoDatabase db = mongoClient.getDatabase(DB_NAME);
		MongoCollection<Document> dbColl = db.getCollection(DB_COLL_COMPETITIONS);

		int i = 0;
		for (Competition competition : competitions.getCompetitions()) {
			if (i > 100)
				break;
			DBCompetition comp = new DBCompetition();
			comp.setId(competition.getCompetition_id());
			comp.setNome(competition.getTitle());
			if (!competition.getCountry().isEmpty())
				comp.setCountry_code(competition.getCountry().get(0).getCountryCode());

			dbColl.insertOne(MongoJackDao.toDocument(DBCompetition.class, comp));
			i++;
		}
		mongoClient.close();
	}
}
