package it.nerdherd.betresults.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import it.nerdherd.betresults.dao.PartiteMapper;
import it.nerdherd.betresults.rest.client.DataFactoryService;
import it.nerdherd.betresults.rest.model.CompetitionList;

@Path("/init")
public class InitRestService {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public CompetitionList getCompetitionList() {
		CompetitionList competitions = DataFactoryService.getInstance().getCompetitions();
		PartiteMapper.storeDBCompetitions(competitions);
		return null;
	}
}