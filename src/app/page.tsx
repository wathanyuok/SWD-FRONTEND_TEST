"use client";
import "./globals.css";
import styles from "./page.module.css";
import MenuCards from "./MenuCards";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Home() {
  return (
    <div className={styles.page}>
      <div style={{ position: "absolute", top: 24, right: 24, zIndex: 10 }}>
        <LanguageSwitcher />
      </div>

      <main className={styles.main}>
        <div style={{ marginTop: 40 }}>
          <MenuCards />
        </div>
      </main>
    </div>
  );
}