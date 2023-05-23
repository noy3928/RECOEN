export function convertTimeFormat(time: string) {
  const currentTime = Date.now();
  const pastTime = new Date(time);
  const pastTimeInMs = pastTime.getTime();

  const differenceInSeconds = Math.floor((currentTime - pastTimeInMs) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds}초 전`;
  } else if (differenceInSeconds < 3600) {
    return `${Math.floor(differenceInSeconds / 60)}분 전`;
  } else if (differenceInSeconds < 43200) {
    // 12 hours in seconds
    return `${Math.floor(differenceInSeconds / 3600)}시간 전`;
  } else {
    return pastTime.toISOString().slice(0, 10).replace(/-/g, '.');
  }
}
