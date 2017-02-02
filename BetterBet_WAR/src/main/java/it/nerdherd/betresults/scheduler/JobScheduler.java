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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import it.nerdherd.betresults.scheduler.job.CompetitionSchedulerJob;

public class JobScheduler implements ServletContextListener {
	private static final Logger log = LoggerFactory.getLogger(JobScheduler.class);

	public static final CronScheduleBuilder COMP_SCHEDULE = CronScheduleBuilder.cronSchedule("");
	public static final CronScheduleBuilder MATCH_SCHEDULE = CronScheduleBuilder.cronSchedule("");

	public static final JobKey COMP_JOB_KEY = JobKey.jobKey("competitionSchedulerJob");
	public static final JobKey MATCH_JOB_KEY = JobKey.jobKey("matchSchedulerJob");

	public static final TriggerKey COMP_TRIGGER_KEY = TriggerKey.triggerKey("competitionSchedulerTrigger");
	public static final TriggerKey MATCH_TRIGGER_KEY = TriggerKey.triggerKey("matchSchedulerTrigger");

	private Scheduler scheduler;

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		try {
			log.info("Application exit. delete Jobs.");
			scheduler.deleteJob(COMP_JOB_KEY);
			scheduler.deleteJob(MATCH_JOB_KEY);
		} catch (SchedulerException e) {
			log.error("error contextDestroyed: " + e.getMessage(), e);
		}
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try {
			log.info("Application started. shedule Jobs.");
			scheduler = new StdSchedulerFactory().getScheduler();
			scheduler.start();

			sheduleCompetitionJob();
			sheduleMatchJob();
		} catch (SchedulerException e) {
			log.error("error contextInitialized: " + e.getMessage(), e);
		}
	}

	private void sheduleCompetitionJob() throws SchedulerException {
		JobDetail job = JobBuilder.newJob(CompetitionSchedulerJob.class).withIdentity(COMP_JOB_KEY).build();
		Trigger trigger = TriggerBuilder.newTrigger().withIdentity(COMP_TRIGGER_KEY).startNow()
				.withSchedule(COMP_SCHEDULE).build();
		scheduler.scheduleJob(job, trigger);
		log.info("sheduleCompetitionJob success. with cron: " + COMP_SCHEDULE);
	}

	private void sheduleMatchJob() throws SchedulerException {
		JobDetail job = JobBuilder.newJob(CompetitionSchedulerJob.class).withIdentity(MATCH_JOB_KEY).build();

		Trigger trigger = TriggerBuilder.newTrigger().withIdentity(MATCH_TRIGGER_KEY).startNow()
				.withSchedule(MATCH_SCHEDULE).build();
		scheduler.scheduleJob(job, trigger);
		log.info("sheduleMatchJob success. with cron: " + MATCH_SCHEDULE);
	}
}
