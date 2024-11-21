export const BASE_URL = "https://en.wikipedia.org/w/api.php";

const prepareResponseData = (data: (string | string[])[]) => {
  const titles = [...data[1]];
  const descriptions = [...data[2]];
  const urls = [...data[3]];

  const formattedResults = titles.map((title, index) => {
    return {
      title,
      description: descriptions[index],
      url: urls[index],
    };
  });

  return formattedResults;
};

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    if (!query.text) {
      throw new Error("No search query provided");
    }
    const response = await fetch(
      `${BASE_URL}?action=opensearch&search=${query.text}`
    );
    const data = await response.json();
    const formattedData = prepareResponseData(data);
    return { results: formattedData };
  } catch (error) {
    throw createError({
      status: 500,
      message: String(error),
    });
  }
});
