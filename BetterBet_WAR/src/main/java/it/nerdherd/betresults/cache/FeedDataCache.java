package it.nerdherd.betresults.cache;

import it.nerdherd.betresults.rest.client.DataFactoryService;
import it.nerdherd.betresults.rest.client.Resources;
import it.nerdherd.betresults.rest.model.CompetitionList;

public class FeedDataCache {
	private static FeedDataCache INSTANCE = null;

	private FeedDataCache() {
	}

	public static FeedDataCache getInstance() {
		if (INSTANCE == null)
			INSTANCE = new FeedDataCache();
		return INSTANCE;
	}

	private CompetitionList competitions = null;

	public void loadCompetitions() {
		competitions = DataFactoryService.getInstance().getCompetitions(Resources.COMPETITIONS_LIST);
	}

	public CompetitionList getCompetitions() {
		if (competitions == null)
			loadCompetitions();
		return competitions;
	}
}
