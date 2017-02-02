package it.nerdherd.betresults.scheduler;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.quartz.impl.StdSchedulerFactory;

import it.nerdherd.betresults.scheduler.job.CompetitionSchedulerJob;

public class JobScheduler implements ServletContextListener {
	public static final CronScheduleBuilder COMP_SCHEDULE = CronScheduleBuilder.cronSchedule("0 0 4 30 1/1 ? *");
	public static final CronScheduleBuilder MATCH_SCHEDULE = CronScheduleBuilder.cronSchedule("0 0 4 1/1 * ? *");

	public static final JobKey COMP_JOB_KEY = JobKey.jobKey("competitionSchedulerJob");
	public static final JobKey MATCH_JOB_KEY = JobKey.jobKey("matchSchedulerJob");

	public static final TriggerKey COMP_TRIGGER_KEY = TriggerKey.triggerKey("competitionSchedulerTrigger");
	public static final TriggerKey MATCH_TRIGGER_KEY = TriggerKey.triggerKey("matchSchedulerTrigger");

	private Scheduler scheduler;

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		try {
			System.out.println("Application exit. delete Jobs.");
			scheduler.deleteJob(COMP_JOB_KEY);
			scheduler.deleteJob(MATCH_JOB_KEY);
		} catch (SchedulerException e) {
			System.err.println("error contextDestroyed: " + e.getMessage());
		}
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try {
			System.out.println("Application started. shedule Jobs.");
			scheduler = new StdSchedulerFactory().getScheduler();
			scheduler.start();

			sheduleCompetitionJob();
			sheduleMatchJob();
		} catch (SchedulerException e) {
			System.err.println("error contextInitialized: " + e.getMessage());
		}
	}

	private void sheduleCompetitionJob() throws SchedulerException {
		JobDetail job = JobBuilder.newJob(CompetitionSchedulerJob.class).withIdentity(COMP_JOB_KEY).build();
		Trigger trigger = TriggerBuilder.newTrigger().withIdentity(COMP_TRIGGER_KEY).startNow()
				.withSchedule(COMP_SCHEDULE).build();
		scheduler.scheduleJob(job, trigger);
		System.out.println("sheduleCompetitionJob success. with cron: " + COMP_SCHEDULE);
	}

	private void sheduleMatchJob() throws SchedulerException {
		JobDetail job = JobBuilder.newJob(CompetitionSchedulerJob.class).withIdentity(MATCH_JOB_KEY).build();

		Trigger trigger = TriggerBuilder.newTrigger().withIdentity(MATCH_TRIGGER_KEY).startNow()
				.withSchedule(MATCH_SCHEDULE).build();
		scheduler.scheduleJob(job, trigger);
		System.out.println("sheduleMatchJob success. with cron: " + MATCH_SCHEDULE);
	}
}
