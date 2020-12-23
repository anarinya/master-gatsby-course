import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // Create a new sub-item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // Make new doc ID so we don't have a random string of numbers
            .documentId('downtown')
        ),
      // Add in the rest of the menu entry items
      ...S.documentTypeListItems().filter(
        // Don't include the store settings page since it's the same as home
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
