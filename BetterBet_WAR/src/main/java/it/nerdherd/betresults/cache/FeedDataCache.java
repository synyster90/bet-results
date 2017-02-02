package it.nerdherd.betresults.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import it.nerdherd.betresults.dao.PartiteMapper;
import it.nerdherd.betresults.rest.model.CompetitionList;

public class FeedDataCache {
	private static final Logger log = LoggerFactory.getLogger(FeedDataCache.class);

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
		competitions = new CompetitionList();
		competitions.setCompetitions(PartiteMapper.getDBCompetitions());
	}

	public CompetitionList getCompetitions() {
		if (competitions == null)
			loadCompetitions();
		return competitions;
	}
}
