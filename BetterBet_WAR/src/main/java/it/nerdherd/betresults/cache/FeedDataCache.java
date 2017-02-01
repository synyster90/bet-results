package it.nerdherd.betresults.cache;

import java.util.ArrayList;
import java.util.List;

import it.nerdherd.betresults.rest.client.DataFactoryService;
import it.nerdherd.betresults.rest.client.Resources;
import it.nerdherd.betresults.rest.model.BaseCompetition;

public class FeedDataCache {
	private static FeedDataCache INSTANCE = null;

	private FeedDataCache() {
	}

	public static FeedDataCache getInstance() {
		if (INSTANCE == null)
			INSTANCE = new FeedDataCache();
		return INSTANCE;
	}

	private List<BaseCompetition> competitions = new ArrayList<>();

	public void loadCompetitions() {
		competitions = DataFactoryService.getInstance().getCompetitions(Resources.COMPETITIONS_LIST);
	}

	public List<BaseCompetition> getCompetitions() {
		if (competitions.isEmpty())
			loadCompetitions();
		return competitions;
	}
}
