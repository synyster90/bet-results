package it.nerdherd.betresults.rest;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import it.nerdherd.betresults.cache.FeedDataCache;
import it.nerdherd.betresults.rest.model.BaseCompetition;

@Path("/users")
public class InitRestService {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<BaseCompetition> getDefaultUserInJSON() {
		List<BaseCompetition> competitionList = FeedDataCache.getInstance().getCompetitions();
		return competitionList;
	}
}