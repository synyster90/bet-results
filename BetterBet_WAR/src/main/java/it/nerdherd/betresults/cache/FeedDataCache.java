package it.nerdherd.betresults.cache;

import java.util.List;

import it.nerdherd.betresults.dao.PartiteMapper;
import it.nerdherd.betresults.rest.model.PartiteJson.Competition;
import it.nerdherd.betresults.rest.model.PartiteJson.Matches;

public class FeedDataCache {
	private static FeedDataCache INSTANCE = null;

	private FeedDataCache() {
		PartiteMapper.checkForUpdate();
	}

	public static FeedDataCache getInstance() {
		if (INSTANCE == null)
			INSTANCE = new FeedDataCache();
		return INSTANCE;
	}

	private List<Competition> competitions = null;

	private List<Matches> matches = null;

	public void loadCompetitions() {
		competitions = PartiteMapper.getDBCompetitions();
	}

	private void loadMatches() {
		matches = PartiteMapper.getDBMatches();
	}

	public List<Competition> getCompetitions() {
		if (competitions == null)
			loadCompetitions();
		return competitions;
	}

	public List<Matches> getMatches() {
		if (matches == null)
			loadMatches();
		return matches;
	}
}
