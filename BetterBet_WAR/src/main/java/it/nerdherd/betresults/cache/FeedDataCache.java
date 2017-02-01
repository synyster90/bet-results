package it.nerdherd.betresults.cache;

import it.nerdherd.betresults.rest.client.DataFactoryService;
import it.nerdherd.betresults.rest.client.Resources;

public class FeedDataCache {
	private static FeedDataCache INSTANCE = null;

	private FeedDataCache() {
	}

	public static FeedDataCache getInstance() {
		if (INSTANCE == null)
			INSTANCE = new FeedDataCache();
		return INSTANCE;
	}

	private String competitions = null;

	public void loadCompetitions() {
		competitions = DataFactoryService.getInstance().getCompetitions(Resources.COMPETITIONS_LIST);
	}

	public String getCompetitions() {
		if (competitions == null)
			loadCompetitions();
		return competitions;
	}
}
