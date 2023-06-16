import React, { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import css from './App.module.css';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const updateFeedback = (nameFeedback) => {
    setFeedback((prevState) => ({
      ...prevState,
      [nameFeedback]: prevState[nameFeedback] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.floor(
      (feedback.good / (feedback.good + feedback.neutral + feedback.bad)) *
        100 ||
        0
    );
  };

  return (
    <div className={css.container}>
      <Section title="Please Leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeavefeedback={updateFeedback}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback yet..." />
        ) : (
          <Statistics
            options={Object.keys(feedback)}
            statistic={feedback}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        )}
      </Section>
    </div>
  );
};
