import { getRandomInt, getRandomFloat } from "./helper";

const makeChromosome = ({ GENES_COUNT, GENE_MIN, GENE_MAX }) => {
  const MUTATION_LIKELIHOOD = 5.0;

  const makeChromosomeHelper = () => {
    let genes = Array(GENES_COUNT).fill(0);
    let fitness = 0;
    let likelihood = 0;
    const getGenes = () => genes;

    const getRandomCrossoverLine = () => getRandomInt(0, GENES_COUNT - 2);
    const cloneChromosome = ({ fitness, likelihood, genes }) => {
      const result = makeChromosomeHelper();
      result.setFitness(fitness);
      result.setLikelihood(likelihood);
      result.setGenes(genes);
      return result;
    };

    const doubleCrossover = (chromosome) => {
      const crossoverline = getRandomCrossoverLine(GENES_COUNT);
      const result = [makeChromosomeHelper(), makeChromosomeHelper()];

      for (let i = 0; i < GENES_COUNT; ++i) {
        if (i <= crossoverline) {
          result[0].getGenes()[i] = getGenes()[i];
          result[1].getGenes()[i] = chromosome.getGenes()[i];
        } else {
          result[0].getGenes()[i] = chromosome.getGenes()[i];
          result[1].getGenes()[i] = getGenes()[i];
        }
      }
      return result;
    };

    return {
      getFitness: () => fitness,
      setFitness: (_fitness) => (fitness = _fitness),
      getGenes,
      setGenes: (_genes) => (genes = _genes),
      getLikelihood: () => likelihood,
      setLikelihood: (_likelihood) => (likelihood = _likelihood),
      calculateFitness: ({ a, b, c, d, y }) => {
        const [x1, x2, x3, x4] = genes;
        const closeness = Math.abs(y - (x1 * a + x2 * b + x3 * c + x4 * d));
        return closeness === 0 ? -1 : closeness;
      },
      mutateWithGivenLikelihood: () => {
        const result = cloneChromosome({ fitness, likelihood, genes });
        for (let i = 0; i < GENES_COUNT; ++i) {
          const randomPercent = getRandomFloat(0, 100);
          randomPercent < MUTATION_LIKELIHOOD &&
            (result.getGenes()[i] = getRandomInt(GENE_MIN, GENE_MAX));
        }
        return result;
      },
      singleCrossover: (chromosome) => {
        const children = doubleCrossover(chromosome);
        const childNumber = getRandomInt(0, 1);
        return children[childNumber];
      },
      toString: () => {
        let result = "Корені: (";
        for (let i = 0; i < GENES_COUNT; ++i) {
          result += `${genes[i]}${i < GENES_COUNT - 1 ? ", " : ""}`;
        }
        result += ")\n";
        return result;
      },
    };
  };
  return makeChromosomeHelper();
};

export default makeChromosome;
