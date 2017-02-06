package it.nerdherd.betresults.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import it.nerdherd.betresults.cache.FeedDataCache;
import it.nerdherd.betresults.rest.model.PartiteJson;

@Path("/init")
public class InitRestService {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public PartiteJson getCompetitionList() {
		PartiteJson response = new PartiteJson();
		response.setCompetitions(FeedDataCache.getInstance().getCompetitions());
		response.setMatches(FeedDataCache.getInstance().getMatches());
		return response;
	}
}