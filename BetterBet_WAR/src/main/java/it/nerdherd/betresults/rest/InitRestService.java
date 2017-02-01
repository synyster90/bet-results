package it.nerdherd.betresults.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import it.nerdherd.betresults.cache.FeedDataCache;
import it.nerdherd.betresults.rest.model.Competition;

@Path("/users")
public class InitRestService {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Competition getDefaultUserInJSON() {
		Competition user = new Competition();
		user.setFirstName(FeedDataCache.getInstance().getCompetitions());
		user.setLastName("DoeFromREST");
		return user;
	}
}