package it.nerdherd.betresults.rest.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import it.nerdherd.betresults.rest.model.CompetitionList;

public class DataFactoryService {
	private static final Logger log = LoggerFactory.getLogger(DataFactoryService.class);

	private static final String FEED_SOURCE_BASE_URL = "http://www.goal.com/feed/";
	private static DataFactoryService INSTANCE = null;

	private DataFactoryService() {
	}

	public static DataFactoryService getInstance() {
		if (INSTANCE == null)
			INSTANCE = new DataFactoryService();
		return INSTANCE;
	}

	public CompetitionList getCompetitions(String op) throws RuntimeException {
		ObjectMapper mapper = new ObjectMapper();
		HttpURLConnection conn = null;
		try {
			URL url = new URL(FEED_SOURCE_BASE_URL + op);
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

			log.info("output: " + output);

			String prova = "{\"competitions\": []}";
			CompetitionList competitionProva = mapper.readValue(prova, CompetitionList.class);
			log.info("prova mapping: " + competitionProva.getCompetitions().size());

			CompetitionList competition = mapper.readValue(output, CompetitionList.class);
			return competition;
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
