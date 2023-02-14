import { View, Text, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning";
import { useNavigation } from "@react-navigation/native";

const weekdays = [
  { text: "D", key: "sunday" },
  { text: "S", key: "monday" },
  { text: "T", key: "tuesday" },
  { text: "Q", key: "wednesday" },
  { text: "Q", key: "thursday" },
  { text: "S", key: "friday" },
  { text: "S", key: "saturday" },
];
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill =
  minimumSummaryDatesSizes - datesFromYearBeginning.length;

export function Home() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekdays.map((weekday) => (
          <Text
            key={weekday.key}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekday.text}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearBeginning.map((date) => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate("habit", { date: date.toISOString() })}
            />
          ))}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                className="bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                key={index}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
