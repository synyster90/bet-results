package it.nerdherd.betresults.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import it.nerdherd.betresults.cache.FeedDataCache;
import it.nerdherd.betresults.rest.model.CompetitionList;

@Path("/users")
public class InitRestService {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public CompetitionList getDefaultUserInJSON() {
		CompetitionList competitionList = FeedDataCache.getInstance().getCompetitions();
		return competitionList;
	}
}