import { PropTypes } from 'prop-types';
import Badge from 'react-bootstrap/Badge';


export function Difficulty(props) {
    const translateClass = {
        "easy": "success",
        "medium": "warning",
        "hard": "danger",
    };

    // const badgeClass = translateClass(props.level);
    return (
        <Badge pill bg={translateClass[props.level.toLowerCase()]}>
            {(props.level).toUpperCase()}
        </Badge>
    );
}
Difficulty.propTypes = {
    level: PropTypes.string.isRequired,
};