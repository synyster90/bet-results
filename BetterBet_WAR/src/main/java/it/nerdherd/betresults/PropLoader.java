package it.nerdherd.betresults;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class PropLoader {

	private static PropLoader INSTANCE = null;

	private Map<String, Properties> propList;

	private PropLoader() {
		propList = new HashMap<>();
	}

	public static PropLoader getInstance() {
		if (INSTANCE == null)
			INSTANCE = new PropLoader();
		return INSTANCE;
	}

	public Properties getProperties(String file_name) throws IOException {
		if (propList.containsKey(file_name))
			return propList.get(file_name);
		else {
			try {
				Properties prop = new Properties();
				InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream(file_name);
				prop.load(in);
				in.close();

				propList.put(file_name, prop);
				return prop;
			} catch (IOException e) {
				System.err.println("error loading prop file: " + file_name);
				throw e;
			}
		}
	}

}
