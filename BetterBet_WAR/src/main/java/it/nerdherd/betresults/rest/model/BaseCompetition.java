package it.nerdherd.betresults.rest.model;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class BaseCompetition {

	private List<Competition> Competition;

	public List<Competition> getCompetition() {
		return Competition;
	}

	public void setCompetition(List<Competition> competition) {
		Competition = competition;
	}

	public class Competition {
		private String competition_id;
		private String name;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getCompetition_id() {
			return competition_id;
		}

		public void setCompetition_id(String competition_id) {
			this.competition_id = competition_id;
		}
	}
}