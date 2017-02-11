package it.nerdherd.betresults.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import it.nerdherd.betresults.cache.FeedDataCache;
import it.nerdherd.betresults.rest.client.DataFactoryService;
import it.nerdherd.betresults.rest.model.LivePartiteJson;
import it.nerdherd.betresults.rest.model.LivePartiteRequestJson;
import it.nerdherd.betresults.rest.model.PartiteJson;

@Path("/")
public class PartiteRestService {

	@GET
	@Path("/init")
	@Produces(MediaType.APPLICATION_JSON)
	public PartiteJson init() {
		System.out.println("init REST API");
		PartiteJson response = new PartiteJson();
		response.setCompetitions(FeedDataCache.getInstance().getCompetitions());
		response.setMatches(FeedDataCache.getInstance().getMatches());
		return response;
	}

	@POST
	@Path("/live")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public LivePartiteJson live(LivePartiteRequestJson input) {
		return DataFactoryService.getInstance().liveScores("");
	}
}