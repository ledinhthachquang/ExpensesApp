import { View, Text , StyleSheet} from 'react-native'
import React from 'react'

const TermScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        Expense: An expense is any type of payment or cost that is
        incurred while carrying out a task or activity. This could include
        anything from groceries and rent to transportation and entertainment.
      </Text>
      <Text>
        Income: Income refers to any money that you receive from sources such as
        a job, investments, or rental properties.
      </Text>
      <Text>
        Budget: A budget is a plan that outlines how much money you can afford
        to spend on different expenses and activities during a specified period
        of time. This helps you to manage your finances more effectively and
        avoid overspending.{' '}
      </Text>
      <Text>
        Category: Categories are groups that expenses can be grouped into.
        Common categories include food, entertainment, transportation, and
        housing.
      </Text>
      <Text>
        Transaction: A transaction is a record of a financial exchange between
        two parties, such as a purchase or payment.{' '}
      </Text>
      <Text>
        Account: An account is a record of all your income, expenses, and
        transactions over a period of time. You may have multiple accounts, such
        as a checking account, a credit card account, and an investment account.{' '}
      </Text>
      <Text>
        Reminder: A reminder is a notification that is set to remind you to
        complete a task, such as paying a bill or submitting an expense report.{' '}
      </Text>
      <Text>
        Receipt: A receipt is a document that provides proof of a financial
        transaction, typically provided by a vendor or supplier.
      </Text>
      <Text>
        Report: A report is a summary of your expenses and income for a specific
        period of time, typically used for budgeting and tax purposes.
      </Text>
      <Text>
        Sync: Syncing is the process of transferring data between your expense
        manager app and other devices or platforms, such as your computer or
        bank account. This helps you to keep your financial information
        up-to-date and accurate.
      </Text>
    </View>
  )
}

export default TermScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      fontSize: 14,
      backgroundColor: '#fff'
    }
  });