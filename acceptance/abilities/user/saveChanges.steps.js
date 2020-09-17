import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('specification/abilities/user/save-changes.feature');

defineFeature(feature, (test) => {
  test.skip('Save changes made in a document', ({
    given, and, when, then,
  }) => {
    given('Sini, a user', () => {

    });

    and(/^Sini opened a document with the content (.*) in it$/, (content) => {

    });

    when(/^Sini changes the content to (.*)$/, (content) => {

    });

    and('saves it', () => {

    });

    then(/^the document should be saved with content (.*) in it$/, (content) => {

    });
  });


  test.skip('Saving changes in content with picture in it', ({
    given, and, when, then,
  }) => {
    given('Sini, a user', () => {

    });

    and('Sini inserted a picture in the document', () => {

    });

    when('Sini wants to save it', () => {

    });

    then('the document should not be saved', () => {

    });

    and('Sini should be able to see that it wasn\'t possible to save the document', () => {

    });

    and('that the content of the document can only contain text', () => {

    });
  });

  test.skip('Seeing latest version of the saved document', ({
    given, and, when, then,
  }) => {
    given('Sini, a user', () => {

    });

    and(/^Sini changed the content of the document from (.*)$/, (content) => {

    });

    and('she saved it', () => {

    });

    when('Sini opens the document', () => {

    });

    then(/^Sini should see the content (.*) in it$/, (content) => {

    });
  });

  test.skip('Changing the content without saving', ({
    given, and, when, then,
  }) => {
    given('Sini, a user', () => {

    });

    and(/^Sini changed the content of the document from (.*)$/, (content) => {

    });

    and('she didn\'t save it', () => {

    });

    when('Sini opens the document', () => {

    });

    then(/^Sini should see the content (.*) in it$/, (content) => {

    });
  });
});
