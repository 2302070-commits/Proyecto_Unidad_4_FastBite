import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BUTTONS = [
	["C", "DEL", "/", "*"],
	["7", "8", "9", "-"],
	["4", "5", "6", "+"],
	["1", "2", "3", "="],
	["0", ".", "(", ")"],
];

const isOperator = (value) => ["/", "*", "-", "+"].includes(value);

const sanitizeExpression = (expression) => {
	const trimmed = expression.trim();
	if (!trimmed) return "";
	if (!/^[0-9+\-*/().\s]+$/.test(trimmed)) return "";
	return trimmed;
};

const evaluateExpression = (expression) => {
	const safe = sanitizeExpression(expression);
	if (!safe) return "";

	try {
		// eslint-disable-next-line no-new-func
		const result = Function(`"use strict"; return (${safe})`)();
		if (Number.isNaN(result) || !Number.isFinite(result)) return "";
		return String(result);
	} catch (error) {
		return "";
	}
};

export default function Calculadora() {
	const [display, setDisplay] = useState("0");
	const [lastInput, setLastInput] = useState("");

	const handlePress = (value) => {
		if (value === "C") {
			setDisplay("0");
			setLastInput("");
			return;
		}

		if (value === "DEL") {
			const next = display.length > 1 ? display.slice(0, -1) : "0";
			setDisplay(next);
			setLastInput("");
			return;
		}

		if (value === "=") {
			const result = evaluateExpression(display);
			setDisplay(result || "0");
			setLastInput("");
			return;
		}

		if (value === ".") {
			const parts = display.split(/\+|\-|\*|\//);
			const current = parts[parts.length - 1];
			if (current.includes(".")) return;
		}

		if (isOperator(value)) {
			if (isOperator(lastInput)) {
				const next = `${display.slice(0, -1)}${value}`;
				setDisplay(next);
				setLastInput(value);
				return;
			}
		}

		const nextDisplay = display === "0" && !isOperator(value) && value !== "." ? value : `${display}${value}`;
		setDisplay(nextDisplay);
		setLastInput(value);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.display}>
				<Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
					{display}
				</Text>
			</View>
			<View style={styles.keyboard}>
				{BUTTONS.map((row, rowIndex) => (
					<View style={styles.row} key={`row-${rowIndex}`}>
						{row.map((label) => (
							<TouchableOpacity
								key={label}
								style={[
									styles.button,
									label === "=" && styles.equalButton,
									(label === "C" || label === "DEL") && styles.utilityButton,
									isOperator(label) && styles.operatorButton,
								]}
								onPress={() => handlePress(label)}
							>
								<Text
									style={[
										styles.buttonText,
										label === "=" && styles.equalText,
										(label === "C" || label === "DEL") && styles.utilityText,
										isOperator(label) && styles.operatorText,
									]}
								>
									{label}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				))}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f172a",
		padding: 20,
	},
	display: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "flex-end",
		paddingVertical: 24,
	},
	displayText: {
		color: "#f8fafc",
		fontSize: 48,
		fontWeight: "600",
	},
	keyboard: {
		flex: 3,
		gap: 14,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 14,
	},
	button: {
		flex: 1,
		height: 64,
		borderRadius: 18,
		backgroundColor: "#1e293b",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#e2e8f0",
		fontSize: 22,
		fontWeight: "600",
	},
	operatorButton: {
		backgroundColor: "#2563eb",
	},
	operatorText: {
		color: "#eff6ff",
	},
	utilityButton: {
		backgroundColor: "#0ea5e9",
	},
	utilityText: {
		color: "#f0f9ff",
	},
	equalButton: {
		backgroundColor: "#f97316",
	},
	equalText: {
		color: "#fff7ed",
	},
});
