type AudioFileAttribute = {
  name: string;
  url: string;
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
