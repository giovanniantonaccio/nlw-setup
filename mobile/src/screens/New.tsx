import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  const [title, setTitle] = useState("");

  function handleToggleSelectedWeekday(weekdayIndex: number) {
    if (selectedWeekdays.includes(weekdayIndex)) {
      setSelectedWeekdays((prev) =>
        prev.filter((weekday) => weekday !== weekdayIndex)
      );
    } else {
      setSelectedWeekdays((prev) => [...prev, weekdayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || selectedWeekdays.length === 0) {
        Alert.alert(
          "Novo hábito",
          "Informe o novo hábito e escolha a periodicidade."
        );
      }
      await api.post("/habits", {
        title,
        weekdays: selectedWeekdays,
      });

      setTitle("");
      setSelectedWeekdays([]);

      Alert.alert("Novo hábito", "Hábito criado com sucesso!");
    } catch (error) {
      Alert.alert("Ops", "Não foi possível criar o novo hábito.");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábitor
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {availableWeekdays.map((weekday, index) => (
          <Checkbox
            key={weekday}
            checked={selectedWeekdays.includes(index)}
            title={weekday}
            onPress={() => handleToggleSelectedWeekday(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          onPress={handleCreateNewHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
