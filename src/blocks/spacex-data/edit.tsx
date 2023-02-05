/**
 * External dependencies.
 */
import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

/**
 * Internal dependencies.
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { title } = attributes;

  return (
    <div {...useBlockProps()}>
      <RichText
        className="wp-block-wp-react-kit-header_title"
        tagName="h2"
        placeholder={__("BSF-Spacex title", "bsf-spacex")}
        value={title}
        onChange={(title: string) => setAttributes({ title })}
      />
    </div>
  );
}
