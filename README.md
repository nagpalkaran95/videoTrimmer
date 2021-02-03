# videoTrimmer

Usage:
* git clone
* `node index.js`
* hit endpoint with videourl (required) and time (optional)

Examples:
1. `localhost:3000/trim?video=https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4`
2. `localhost:3000/trim?video=https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4&time=2`

Output:
```
{
    "message": "video trimmed successfully",
    "url": "https://drive.google.com/drive/folders/1tCv9_DiSLZfGW1LfaetFTWACjIgAFn9H?usp=sharing"
}
```


**Note:**
File gets uploaded on the Google Drive successfully but sometimes takes time to render so could be possible it's visible (with correct timestamp and thumbnail) but not playing initially.

**Not uploaded googleAuth creds so won't work until you create auth file and token file.**
