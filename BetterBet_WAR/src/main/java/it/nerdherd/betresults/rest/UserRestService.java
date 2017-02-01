package it.nerdherd.betresults.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import it.nerdherd.betresults.rest.model.User;

@Path("/users")
public class UserRestService {
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public User getDefaultUserInJSON() {
		User user = new User();
		user.setFirstName("JonFromREST");
		user.setLastName("DoeFromREST");
		return user;
	}
}