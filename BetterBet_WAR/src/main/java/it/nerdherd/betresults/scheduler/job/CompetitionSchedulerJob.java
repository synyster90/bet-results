package it.nerdherd.betresults.scheduler.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import it.nerdherd.betresults.dao.PartiteMapper;

public class CompetitionSchedulerJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		System.out.println("competitionSchedulerJob START.. ");
		PartiteMapper.updateDBCompetitions();
		System.out.println("competitionSchedulerJob FINISH.");
	}
}
