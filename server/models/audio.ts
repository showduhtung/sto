type AudioFileAttribute = {
  name: string;
  url: string;
  // url: `"https://d9qryu57vn5tu.cloudfront.net/en-us/best-2023/${string}.m4a`;
  timestamps: number[];
};

function AudioFileModel(data: AudioFileAttribute[]) {
  return data.map(({ name, url, timestamps }) => ({
    name: String(name),
    url: String(url),
    timestamps: timestamps.map((timestamp) => Number(timestamp)),
  }));
}

export { AudioFileModel };
