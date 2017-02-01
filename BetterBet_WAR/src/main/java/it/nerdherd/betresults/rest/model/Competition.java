package it.nerdherd.betresults.rest.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Competition {

	private String firstName;
	private String lastName;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
}