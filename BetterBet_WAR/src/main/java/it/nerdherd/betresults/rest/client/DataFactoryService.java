package it.nerdherd.betresults.rest.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Calendar;

import org.codehaus.jackson.map.ObjectMapper;

import it.nerdherd.betresults.rest.model.PartiteJson;
import it.nerdherd.betresults.rest.model.PartiteJson.Matches;

public class DataFactoryService {
	private static final String FEED_SOURCE_BASE_URL = "http://www.goal.com/feed/";

	private static DataFactoryService INSTANCE = null;

	private DataFactoryService() {
	}

	public static DataFactoryService getInstance() {
		if (INSTANCE == null)
			INSTANCE = new DataFactoryService();
		return INSTANCE;
	}

	public PartiteJson getCompetitions() throws RuntimeException {
		System.out.println("	BET RESULTS - goal.com getCompetitions START.. ");
		ObjectMapper mapper = new ObjectMapper();
		HttpURLConnection conn = null;
		try {
			URL url = new URL(FEED_SOURCE_BASE_URL + "gsm/competition?edition=it&format=guest");
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200)
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = "";
			String line;
			while ((line = br.readLine()) != null)
				output += line;

			PartiteJson competitionList = mapper.readValue(output, PartiteJson.class);
			System.out.println(
					"	BET RESULTS - goal.com Loaded Competitions: " + competitionList.getCompetitions().size());
			return competitionList;
		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			if (conn != null)
				conn.disconnect();
		}
	}

	public PartiteJson getMatches(String competition_id) {
		System.out.println("	BET RESULTS - goal.com getMatches START.. ");
		ObjectMapper mapper = new ObjectMapper();
		HttpURLConnection conn = null;
		try {
			URL url = new URL(FEED_SOURCE_BASE_URL + "gsm/competition-fixtures?competitionId=" + competition_id
					+ "&format=guest");
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200)
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = "";
			String line;
			while ((line = br.readLine()) != null)
				output += line;

			// Rimuovo parte iniziale e finale inutile
			output = output.replaceFirst(".*,\"Matches", "{\"Matches");
			output = output.replaceFirst("}]}]}]", "");

			PartiteJson matchesList = mapper.readValue(output, PartiteJson.class);

			// filtro match correnti
			Calendar cal_tre_giorni_fa = Calendar.getInstance();
			cal_tre_giorni_fa.add(Calendar.DAY_OF_YEAR, -3);
			long tre_giorni_fa = Math.round(cal_tre_giorni_fa.getTimeInMillis() / 1000);

			Calendar cal_fra_giorni_fa = Calendar.getInstance();
			cal_fra_giorni_fa.add(Calendar.DAY_OF_YEAR, 3);
			long fra_giorni_fa = Math.round(cal_fra_giorni_fa.getTimeInMillis() / 1000);

			PartiteJson filteredMatchesList = new PartiteJson();
			for (Matches match : matchesList.getMatches())
				if (Long.valueOf(match.getDate_time_utc_moment()) >= tre_giorni_fa
						&& Long.valueOf(match.getDate_time_utc_moment()) <= fra_giorni_fa) {
					match.setCompetition_id(competition_id);
					filteredMatchesList.getMatches().add(match);
				}
			System.out.println("	BET RESULTS - goal.com Loaded Matches filtered by date: "
					+ filteredMatchesList.getMatches().size());
			return filteredMatchesList;
		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			if (conn != null)
				conn.disconnect();
		}
	}
}
