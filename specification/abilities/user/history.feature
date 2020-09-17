Feature: See history of changes made in the document

  As a user
  I can see the history of my saved changes
  to see how the document evolved

  Rules:
  - An entry in the history consists of the description and a timestamp
  - The first entry in the history is an automatically produced notice about the document creation
  - The entries are ordered chronologically
  - Every save with change in the content is an entry in the history

  Background:
    Given Sini, a user

  Scenario: Format of any entry in the history
    Given it's the 20th October 2019 at 10 am
    And Sini described her change with "Add first line"
    When she saves the document
    Then Sini should see a new entry in the history with her description "Add first line" and the saving time "20.10.2019 10:00"

  Scenario: Entry in the history for start monitoring
    Given it's the 20th of October 2019 at 9 am
    When Sini opens a file
    And asks to monitor her changes
    Then Sini should see the first entry in the history "Start watching" and the time "20.10.2019 09:00"

  Scenario: View entries in history chronologically
    Given two entries in the history:
      | time             | description     |
      | 20.10.2019 09:00 | Start watching  |
      | 20.10.2019 10:00 | Add first line  |
    And it's the 20th October 2019 at 10.30 am
    And Sini changed the content
    And added a description "Update headline"
    When Sini saves the document
    Then Sini should see three entries in the history in chronological order
    And the last saved change "Update headline" as the first entry
