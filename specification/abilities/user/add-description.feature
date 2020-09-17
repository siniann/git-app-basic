Feature: Add description while saving changes

  As a user
  I can add a description to save the changes I made
  to reproduce what I did

  Rules:
  - There has to be a description to save changes
  - The description has to follow a fixed syntax
  - The description has to have less than 100 characters

  Scenario: Save changes made in a document without a description
    Given Sini, a user
    And Sini opened a document with the content "Hello Annika" in it
    And she changed the content to "Hello Josua"
    When Sini wants to save the change she made without a description
    Then the document should not be saved
    And Sini should see that adding a description of the change she made is mandatory for saving

  Scenario: Save changes made in a document with a description with less than 100 characters
    Given Sini, a user
    And Sini opened a document with the content "Hello Annika" in it
    And she changed the content to "Hello Josua"
    When Sini wants to save the change she made
    And adds a description "Change name from Annika to Josua"
    Then the document and the description should be saved
    And Sini should see that the change was saved successfully

  Scenario: Save changes made in a document with a description with more than 100 characters
    Given Sini, a user
    And Sini opened a document with the content "Hello Annika" in it
    And she changed the content to "Hello Josua"
    When Sini wants to save the change she made
    And adds a description "Update the content in the file from Hello Annika to Hello Josua and trying to save the changes to the system with a comment"
    Then the document and the description should not be saved
    And Sini should see that the length of the description cannot exceed more than 100 characters

  Scenario: Save changes made in a document with a description starting with words other than Add, Remove, Change, Delete, Update or Correct
    Given Sini, a user
    And Sini opened a document with the content "Hello Annika" in it
    And she changed the content to "Hello Josua"
    When Sini wants to save the change she made
    And adds a description "The content in the file from Hello Annika to Hello Josua"
    Then the document and the description should not be saved
    And Sini should see that the description has to start with one of these words "Add, Remove, Change, Delete, Update, Correct"

  Scenario: See rules related to description to save changes
    Given Sini, a user
    And Sini opened a document with the content "Hello Annika" in it
    And she changed the content to "Hello Josua"
    When Sini wants to save the change she made
    Then Sini should see that she has to add a description of the change she made
    And that the description cannot exceed more than 100 characters
    And that the description has to start with one of these words "Add, Remove, Change, Delete, Update, Correct"
