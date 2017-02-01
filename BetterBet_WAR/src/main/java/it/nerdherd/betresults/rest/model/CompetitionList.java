package it.nerdherd.betresults.rest.model;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class CompetitionList {

	private List<Competition> competitions;

	public List<Competition> getCompetition() {
		return competitions;
	}

	public void setCompetition(List<Competition> competition) {
		competitions = competition;
	}

	public class Competition {
		private String competition_id;
		private String title;

		public String getCompetition_id() {
			return competition_id;
		}

		public void setCompetition_id(String competition_id) {
			this.competition_id = competition_id;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}
	}
}