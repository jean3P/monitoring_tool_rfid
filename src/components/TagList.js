// components/TagList.js

/**
 * Renders a list of tags.
 *
 * @param {Object} params - Object containing the following parameters:
 *   - tags {Array} - An array of tag objects.
 */

function TagList({ tags }) {
    if (tags.length === 0) {
        return <p>No tags to display. Waiting for updates...</p>;
    }

    return (
        <ul>
            {tags.map(tag => (
                <li key={tag.id}>
                    <strong>RFID UID:</strong> {tag.rfid_uid},
                    <strong> Model:</strong> {tag.model},
                    <strong> Created At:</strong> {new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(tag.created_at))}
                </li>
            ))}
        </ul>
    );
}

export default TagList;
