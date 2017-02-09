package it.nerdherd.betresults.cache;

import java.util.Iterator;
import java.util.List;

import it.nerdherd.betresults.dao.PartiteMapper;
import it.nerdherd.betresults.rest.model.PartiteJson.Competition;
import it.nerdherd.betresults.rest.model.PartiteJson.Matches;

public class FeedDataCache {
	private static FeedDataCache INSTANCE = null;

	public static FeedDataCache getInstance() {
		if (INSTANCE == null)
			INSTANCE = new FeedDataCache();
		return INSTANCE;
	}

	private List<Competition> competitions = null;

	private List<Matches> matches = null;

	private FeedDataCache() {
		PartiteMapper.checkForUpdate();
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

	public void loadCompetitions() {
		competitions = PartiteMapper.getDBCompetitions();
	}

	private void loadMatches() {
		matches = PartiteMapper.getDBMatches();

		// clean competitions
		for (Iterator<Competition> iterator = competitions.iterator(); iterator.hasNext();) {
			Competition comp = iterator.next();
			boolean found = false;
			for (Matches match : matches)
				if (match.getCompetition_id().equals(comp.getCompetition_id())) {
					found = true;
					break;
				}
			if (!found)
				iterator.remove();
		}
	}
}
