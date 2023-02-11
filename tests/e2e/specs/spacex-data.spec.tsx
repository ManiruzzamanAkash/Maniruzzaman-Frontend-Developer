const { clickButton, createNewPost, getEditedPostContent, insertBlock } = require( '@wordpress/e2e-test-utils' );
const blockTitle = 'Spacex Data';

describe( 'Spacex Data block', () => {
	beforeEach( async () => {
		jest.setTimeout( 100 * 1000 );
		await createNewPost();
	} );

	it( 'should be able to add the block', async () => {
		await insertBlock( blockTitle );

		const blockContent = await getEditedPostContent();
		expect( blockContent ).toMatchSnapshot();
	} );

	it( 'should display the correct content on the frontend', async () => {
		await insertBlock( blockTitle );

		await clickButton( 'Publish' );

		const pageContent = await page.evaluate( () => document.body.innerHTML );
		expect( pageContent ).toMatchSnapshot();
	} );

	it('should change the button colors', async () => {
		await insertBlock(blockTitle);
	  
		// Change the button colors
		await page.evaluate( ( newButtonColorBg, newButtonColorText ) => {
			wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes(
				wp.data.select( 'core/block-editor' ).getSelectedBlockClientId(),
				{
					buttonColorBg: newButtonColorBg,
					buttonColorText: newButtonColorText,
				}
			);
		}, '#ff0000', '#ffffff' );

		await clickButton( 'Publish' );

		// Get the frontend HTML and compare it against the expected HTML
		const pageContent = await page.evaluate( () => document.body.innerHTML );
		expect( pageContent ).toMatchSnapshot();
	  });
} );
