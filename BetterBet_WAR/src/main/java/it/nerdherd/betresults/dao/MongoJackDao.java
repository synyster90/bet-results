package it.nerdherd.betresults.dao;

import java.io.IOException;
import java.util.Arrays;

import org.bson.Document;
import org.codehaus.jackson.map.ObjectMapper;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

public class MongoJackDao {

	// mongodb://<dbuser>:<dbpassword>@ds135089.mlab.com:35089/betresults
	private static final String DB_URL = "ds135089.mlab.com:35089";
	private static final String DB_USER = "admin";
	private static final char[] DB_PASSWORD = "7a5fe7be311576c3514571959f6789c9".toCharArray();

	public static MongoClient getDBClient() {
		MongoCredential credential = MongoCredential.createCredential(DB_USER, DB_URL, DB_PASSWORD);
		return new MongoClient(new ServerAddress(), Arrays.asList(credential));
	}

	public static <T> T fromDocument(Class<T> clazz, Document document) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return clazz.cast(mapper.readValue(document.toJson(), clazz));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static <T> Document toDocument(Class<T> clazz, T competition) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return Document.parse(mapper.writeValueAsString(clazz.cast(competition)));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
