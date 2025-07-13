export interface Document {
  id: string;
  name: string;
  type: string;
  content: string;
  uploadDate: Date;
}

export const sampleDocuments: Document[] = [
  {
    id: "sample-ai",
    name: "Introduction to AI and Machine Learning",
    type: "text/plain",
    content: `Artificial Intelligence (AI) and Machine Learning

Artificial intelligence (AI) refers to the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction. Machine learning, a subset of AI, enables computers to learn automatically and improve from experience without being explicitly programmed.

Neural networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains. An artificial neural network is based on a collection of connected units or nodes called artificial neurons, which loosely model the neurons in a biological brain.

Deep learning is part of a broader family of machine learning methods based on artificial neural networks with representation learning. Learning can be supervised, semi-supervised or unsupervised. Deep learning architectures such as deep neural networks, deep belief networks, recurrent neural networks and convolutional neural networks have been applied to fields including computer vision, speech recognition, natural language processing, machine translation, bioinformatics, drug design, medical image analysis, material inspection and board game programs.

The concept of gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function. To find a local minimum of a function using gradient descent, we take steps proportional to the negative of the gradient of the function at the current point.

Overfitting occurs when a statistical model describes random error or noise instead of the underlying relationship. This usually happens when a model is excessively complex, such as having too many parameters relative to the number of observations.

Regularization is a process of introducing additional information in order to prevent overfitting. This may be done by adding a penalty to the cost function, which depends on the characteristics of the model.`,
    uploadDate: new Date("2024-01-15"),
  },
  {
    id: "sample-law",
    name: "Legal Terminology and Concepts",
    type: "text/plain",
    content: `Legal Terminology and Basic Concepts

Jurisprudence is the theory or philosophy of law. It is the study of the fundamental nature of law, legal systems, and legal institutions. Jurisprudence seeks to understand the essence of law and its role in society.

A tort is a civil wrong that causes harm or loss to another person, resulting in civil legal liability for the person who commits the tortious act. Tort law differs from criminal law in that it is designed to compensate victims rather than to punish wrongdoers.

Due process is the legal requirement that the state must respect all legal rights that are owed to a person. Due process balances the power of law of the land and protects the individual person from it.

Habeas corpus is a recourse in law through which a person can report an unlawful detention or imprisonment to a court and request that the court order the custodian of the person to bring the prisoner to court to determine whether the detention is lawful.

Stare decisis is a legal doctrine that obligates courts to follow historical cases when making a ruling on a similar case. It ensures that cases with similar scenarios and facts are approached in the same way.

Negligence is a failure to exercise appropriate and/or ethical ruled care expected to be exercised amongst specified circumstances. The area of tort law known as negligence involves harm caused by failing to act as a form of carelessness possibly with extenuating circumstances.

A precedent is a principle or rule established in a previous legal case that is either binding on or persuasive for a court when deciding subsequent cases with similar issues or facts.`,
    uploadDate: new Date("2024-01-10"),
  },
  {
    id: "sample-epidemiology",
    name: "Epidemiology and Public Health",
    type: "text/plain",
    content: `Epidemiology and Public Health Concepts

Epidemiology is the study of the distribution and determinants of health-related states or events in specified populations, and the application of this study to the control of health problems.

Biostatistics is the application of statistics to a wide range of topics in biology. It encompasses the design of biological experiments, the collection and analysis of data from those experiments and the interpretation of the results.

Herd immunity (also called community immunity) is a form of indirect protection from infectious disease that occurs when a large percentage of a population has become immune to an infection, providing a measure of protection for individuals who are not immune.

An epidemic is the rapid spread of disease to a large number of people in a given population within a short period of time. When an epidemic spreads across multiple countries or continents and affects a large number of people, it may be termed a pandemic.

The incidence rate is a measure of the frequency with which new cases of a disease occur in a population over a specified period of time. It is calculated by dividing the number of new cases during a specified period by the population at risk during that period.

Prevalence is a statistical concept referring to the number of cases of a disease that are present in a particular population at a given time. Point prevalence refers to the prevalence measured at a particular point in time.

A cohort study is a form of longitudinal study used in medicine and social science. It is one type of study design and should be compared with a cross-sectional study. A cohort study is often observed for an extended period.

Case-control studies are observational studies that are often used to identify factors that may contribute to a medical condition by comparing subjects who have that condition with patients who do not have the condition.`,
    uploadDate: new Date("2024-01-08"),
  },
];
