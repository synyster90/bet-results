package it.nerdherd.betresults.scheduler.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import it.nerdherd.betresults.dao.PartiteMapper;

public class MatchSchedulerJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		System.out.println("matchSchedulerJob START.. ");
		PartiteMapper.updateDBMatches();
		System.out.println("matchSchedulerJob FINISH.");
	}

}
