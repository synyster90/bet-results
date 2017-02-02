package it.nerdherd.betresults.scheduler.job;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import it.nerdherd.betresults.dao.PartiteMapper;
import it.nerdherd.betresults.rest.client.DataFactoryService;
import it.nerdherd.betresults.rest.model.CompetitionList;

public class CompetitionSchedulerJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		long start_time = System.currentTimeMillis();
		System.out.println("competitionSchedulerJob START.. " + new Date().toString());
		CompetitionList competitions = DataFactoryService.getInstance().getCompetitions();
		System.out.println("Stored " + competitions.getCompetitions().size() + " competitions in DB");
		PartiteMapper.storeDBCompetitions(competitions);
		System.out.println("competitionSchedulerJob FINISH.. in " + (System.currentTimeMillis() - start_time) + "ms");
	}

}
