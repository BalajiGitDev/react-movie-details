import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export function Counter() {
    let [like, setLike] = useState(0);
    let [disLike, setDisLike] = useState(0);

    const incrementLike = () => setLike(like + 1);
    const decrementLike = () => setDisLike(disLike + 1);

    return (
        <div>
            <IconButton onClick={incrementLike} color="success" aria-label="like">
                <Badge badgeContent={like} color="primary">
                    <ThumbUpIcon color="primary" />
                </Badge>
            </IconButton>

            <IconButton onClick={decrementLike} color="error" aria-label="dislike">
                <Badge badgeContent={disLike} color="error">
                    <ThumbDownIcon color="primary" />
                </Badge>
            </IconButton>
        </div>
    );
}
