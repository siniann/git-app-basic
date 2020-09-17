Feature: Version Control

  As a user
  I can open a text file together with GitOffice
  to control its versions while working on it

  Rules:
  - The initial state of the document - which can be empty or not - creates the first entry in the history
  - As soon as there is an unsaved change in the document a call to save it is triggered
  - Saving the document in GitOffice saves it in the text editor at the same time
  - Saving the document in the text editor creates a new entry in the history automatically

  Background:
    Given Sini, a user

  Scenario: Call to save changes
    Given Sini opened a text file together with GitOffice
    When Sini changes the content of the document
    Then Sini should be asked to save the changes: "There are changes in the file. Please add a valid description to the
        change to save it"
    And should be able to save the changes

  Scenario: Saving document with GitOffice
    Given Sini was asked to save the changes
    When Sini saves the changes
    And adds a description
    Then the document should be saved
    And Sini should see a new entry in the history with her description

  Scenario: Saving document with text editor
    Given Sini changed the content of the document
    When Sini saves the text file
    Then the document should be saved
    And Sini should see a new entry in the history: "Document updated automatically"
