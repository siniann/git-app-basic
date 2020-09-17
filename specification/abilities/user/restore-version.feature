Feature: Restore a previous version of the document

  As a user
  I can restore a saved document version
  to return to a previous state

  Rules:
  - Every saved entry in the history is a version of the document
  - The document can be restored to any of its previous saved versions in the history - except the initial (empty)
    version
  - Restoring to an earlier version creates a new entry in the history
  - All entries in the history get consecutively numbered - beginning with the initial created version 1 which is the
    empty document

  Background:
    Given Sini, a user

  Scenario Outline:
    Given an open document with 3 versions in the history
    When Sini restores the document version <number> of the history
    Then Sini should see the content in the state of her <outcome>
    And the restored version <result> be saved as 4th entry in the history

    Examples:
    | number | outcome          | result     |
    | 1      | latest change    | should not |
    | 2      | restored version | should     |
    | 3      | restored version | should     |
