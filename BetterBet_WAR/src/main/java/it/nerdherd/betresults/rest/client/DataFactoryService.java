package it.nerdherd.betresults.rest.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;

import it.nerdherd.betresults.rest.model.BaseCompetition;

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

	public List<BaseCompetition> getCompetitions(String op) throws RuntimeException {
		ObjectMapper mapper = new ObjectMapper();
		HttpURLConnection conn = null;
		try {
			URL url = new URL(FEED_SOURCE_BASE_URL + op + "&edition=it");
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

			List<BaseCompetition> competition = mapper.readValue(output,
					mapper.getTypeFactory().constructCollectionType(List.class, BaseCompetition.class));
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
