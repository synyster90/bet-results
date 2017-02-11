package it.nerdherd.betresults.dao;

import org.codehaus.jackson.annotate.JsonProperty;

public class DBMatch {
	@JsonProperty("_id")
	private String id;

	@JsonProperty("competition_id")
	private String competition_id;

	@JsonProperty("date_time_moment")
	private String date_time_moment;

	@JsonProperty("team_A_id")
	private String team_A_id;

	@JsonProperty("team_A_title")
	private String team_A_title;

	@JsonProperty("team_B_id")
	private String team_B_id;

	@JsonProperty("team_B_title")
	private String team_B_title;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCompetition_id() {
		return competition_id;
	}

	public void setCompetition_id(String competition_id) {
		this.competition_id = competition_id;
	}

	public String getDate_time_moment() {
		return date_time_moment;
	}

	public void setDate_time_moment(String date_time_moment) {
		this.date_time_moment = date_time_moment;
	}

	public String getTeam_A_id() {
		return team_A_id;
	}

	public void setTeam_A_id(String team_A_id) {
		this.team_A_id = team_A_id;
	}

	public String getTeam_A_title() {
		return team_A_title;
	}

	public void setTeam_A_title(String team_A_title) {
		this.team_A_title = team_A_title;
	}

	public String getTeam_B_id() {
		return team_B_id;
	}

	public void setTeam_B_id(String team_B_id) {
		this.team_B_id = team_B_id;
	}

	public String getTeam_B_title() {
		return team_B_title;
	}

	public void setTeam_B_title(String team_B_title) {
		this.team_B_title = team_B_title;
	}

}
