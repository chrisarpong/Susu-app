import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';

export default function TransactionsScreen() {
  const transactions = []; // Will be fetched from API

  return (
    <GlassBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      {transactions.length === 0 ? (
        <BlurView intensity={60} tint="light" style={styles.emptyStateGlass}>
          <Ionicons name="receipt-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>No Transactions</Text>
          <Text style={styles.emptySubtext}>
            Your transaction history will appear here.
          </Text>
        </BlurView>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.transactionId}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <BlurView intensity={60} tint="light" style={styles.txCardGlass}>
              <View
                style={[
                  styles.txIcon,
                  {
                    // Conditional styling based on whether it's a credit or debit
                    backgroundColor:
                      item.transactionType === 'credit'
                        ? COLORS.success + '30'
                        : COLORS.error + '30',
                  },
                ]}
              >
                <Ionicons
                  name={item.transactionType === 'credit' ? 'arrow-down' : 'arrow-up'}
                  size={20}
                  color={item.transactionType === 'credit' ? COLORS.success : COLORS.error}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.txType}>
                  {/* Capitalize the first letter */}
                  {item.transactionType.charAt(0).toUpperCase() + item.transactionType.slice(1)}
                </Text>
                <Text style={styles.txDate}>{item.createdAt}</Text>
              </View>
              <Text
                style={[
                  styles.txAmount,
                  {
                    color: item.transactionType === 'credit' ? COLORS.success : COLORS.text,
                  },
                ]}
              >
                {item.transactionType === 'credit' ? '+' : '-'} GH₵ {item.amount}
              </Text>
            </BlurView>
          )}
        />
      )}
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SIZES.paddingLg,
    paddingTop: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  title: { ...FONTS.h2, color: COLORS.text },
  list: { paddingHorizontal: SIZES.paddingLg, paddingBottom: 120 },
  txCardGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    marginBottom: 12,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  txIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txType: { ...FONTS.semiBold, color: COLORS.text, fontSize: 16 },
  txDate: { ...FONTS.regular, fontSize: SIZES.xs, color: COLORS.textSecondary, marginTop: 2 },
  txAmount: { ...FONTS.bold, fontSize: 16 },
  emptyStateGlass: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingXl,
    marginHorizontal: SIZES.paddingLg,
    marginTop: SIZES.paddingXl,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  emptyTitle: { ...FONTS.h3, marginTop: SIZES.padding, color: COLORS.text },
  emptySubtext: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: SIZES.padding,
  },
});
